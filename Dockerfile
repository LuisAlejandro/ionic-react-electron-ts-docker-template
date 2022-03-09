FROM dockershelf/node:14
LABEL maintainer "Luis Alejandro Martínez Faneyth <luis@collagelabs.org>"

RUN apt-get update && \
    apt-get install aptitude apt-transport-https dirmngr ca-certificates \
                    gnupg git sudo curl libpng-dev build-essential \
                    autoconf automake gcc procps \
                    python2.7-dev python3-pip

RUN dirmngr --debug-level guru

RUN gpg --lock-never --no-default-keyring \
        --keyring /usr/share/keyrings/yarn.gpg \
        --keyserver hkp://keyserver.ubuntu.com:80 \
        --recv-keys 23E7166788B63E1E
RUN echo "deb [arch=amd64 signed-by=/usr/share/keyrings/yarn.gpg] https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN aptitude update && \
    aptitude install yarn

RUN echo "ionic ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/ionic
RUN useradd -ms /bin/bash ionic

USER ionic

RUN mkdir -p /home/ionic/app

WORKDIR /home/ionic/app

CMD tail -f /dev/null
