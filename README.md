# DDDB

D&amp;D DB Modeled after GarlandDB

## Dev Installation

Required software:

- `make`
- `docker`
- `node`

Uses [laravel sail](https://laravel.com/docs/10.x/sail).
First time install:

```
make install
```
Alternatively,
```
docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php83-composer:latest \
    composer install --ignore-platform-reqs
```

Then bring server up.

```
make start
```

Alternatively,
```
sail up -d; npm run dev
```

Recommend setting the alias for interacting with docker server

```
alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'
```
