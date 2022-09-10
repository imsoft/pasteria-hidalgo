# Next.js Pasteria App

Para correr localmente, se necesita la base de datos.

```
docker-compose up -d
```

* El -d, significa __detached__

## Configurar las variables de entorno

Renombrar el archivo **.env.template** a **.env**

- MongoDB URL Local:

```
MONGO_URL=mongodb://localhost:27017/pasteria-hidalgo
```

- Reconstruir los módulos de node y levantar Next

```
yarn install
yarn dev
```

## Llenar la base de datos con información de pruebas

Llamara:

```
http://localhost:3000/api/seed
```

# Pruebas de backend en Postman para __Candidatos__

GET

```
http://localhost:3000/api/candidatos
```

POST

```
http://localhost:3000/api/candidatos
```
Un ejemplo puede ser:  
{  
    "nombre": "Brandon",  
    "puesto": "Chef",  
    "descripcionDelPuesto": "Chef",  
    "fechaDeNacimiento": "15/03/1997",  
    "domicilio": "Cipriano Campos #752",  
    "curp": "GARB970315HJCRMR01",  
    "noImss": "123456789",  
    "noCartaDePolicia": "987654321"  
}  

PUT

```
http://localhost:3000/api/candidatos/<id>
```

DELETE

```
http://localhost:3000/api/candidatos/<id>
```
