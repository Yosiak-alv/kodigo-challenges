# bibliotech
### `Bootcamp fsj-24a`
---

### **Presentado por:**
| Apellido | Nombre |
| -- | -- |
| Alvarenga | Josías |             

---

## Installation

Clone the repository

    git clone https://github.com/Yosiak-alv/kodigo-challenges.git

Switch to the repo folder

    cd bibliotech

With Laragon or XAMPP, put the project in the folder `www` or `htdocs` respectively.

## Reference methods

#### Get all books

```http
  GET http://localhost/bibliotech/index.php
```

#### Search books

```http
  GET http://localhost/bibliotech/index.php?key={key}&value={value}
```

| Parameter | Type     | Description                                             |
|:----------| :------- |:--------------------------------------------------------|
| `key`     | `string` | **Required**. possible values title, category or author |

#### Loan book

```http
  POST http://localhost/bibliotech/index.php
```
#### Request Body Example
```
{
    "id": 1
}

```

