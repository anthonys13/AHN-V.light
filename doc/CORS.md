# CORS

CORS signifie Cross Origin Ressource Sharing, qu'on pourrait traduire en français par "partage de ressources entre les origines / domaines.

Par défaut, dans nos navigateurs, un script exécuté sur "toto.com" sera bloqué s'il essaye de faire une requête vers "http://hello.org".

Dans notre cas, c'est l'API Okanban qui tente d'être consommée par une page "extérieure". En S07 on va coder l'application front qui consommera notre API, et il va donc falloir autoriser les requêtes de notre app front.

Pour autoriser cela, on a besoin d'ajouter un header:

```
Access-Control-Allow-Origin: http://toto.example
```

On pourrait faire un middleware côté express pour l'ajouter, mais on peut également utiliser un package qui fait ça très bien pour nous:

https://www.npmjs.com/package/cors


Exemple d'utilisation du package:

```js
// J'autorise la terre entière
app.use(cors({
    origin: "*"
}))

// Je n'autorise qu'une seule origine spécifique
app.use(cors({
    origin: "http://toto.com"
}))
```