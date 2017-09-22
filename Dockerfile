# Base image: Apache, PHP on Debian:jessie
FROM ubuntu:xenial

LABEL maintainer="{jorgehpo, remi.rampin, yamuna, raonipd, bowen.yu}@nyu.edu"

RUN apt-get update

# Installing apache2
RUN apt-get install -y apache2


# Installing MySQL

RUN echo "mysql-server-5.7 mysql-server/root_password password root" | debconf-set-selections
RUN echo "mysql-server-5.7 mysql-server/root_password_again password root" | debconf-set-selections
RUN apt-get install -y mysql-server-5.7
ADD my.cnf /etc/mysql/conf.d/my.cnf 


# Installing PHP
RUN apt-get install -y php7.0 php7.0-curl php7.0-cli libapache2-mod-php7.0 php7.0-mysqlnd

# Installing vim
RUN apt-get install -y vim

# Installing curl and unzip
RUN apt-get install -y curl unzip

# # Copying visflow to apache folder
WORKDIR /var/www/html/
ADD . /var/www/html/

RUN a2enmod ssl
RUN a2enmod rewrite
RUN a2enmod headers

# Creating SSL files: csr and key
RUN openssl req -new -newkey rsa:2048 -nodes -out visflow.csr -keyout visflow.key -subj "/C=US/ST=/L=/O=NYU/CN=visflow"

# Creating crt file from csr and key
RUN openssl x509 -req -in visflow.csr -signkey visflow.key -out visflow.crt

# Appending apache configuration
RUN cat apache_conf_append.conf >> /etc/apache2/apache2.conf
#RUN cat apache_conf_append.conf >> /etc/apache2/sites-enabled/000-default.conf

EXPOSE 80
EXPOSE 443
EXPOSE 3306

# Running server: Apache + MySQL
RUN chmod +x start-script.sh 
CMD ["./start-script.sh"]


# RUN: docker run -ti -p 80:80 -p 443:443 -v data:/data/visflow -v mysql:/var/lib/mysql visflow