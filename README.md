# apm-node-agnet-1882

## installation mssql via docker

```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=JeSuis1SupetStrongMDP" \
   -p 1433:1433 --name MSSQL \
   -d mcr.microsoft.com/mssql/server:2019-CU3-ubuntu-18.04
```

## switch node version 

```bash
n 14.15.1
n 12.16.2
```

## endpoint

```bash
/test-query
```