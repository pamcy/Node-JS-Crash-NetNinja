**SQL**
- Table
- Row
- Column
- Example: MySQL

**NoSQL**
- Collection
    - 類似 SQL 的 Table
    - user collection 儲存 user document
    - blog collectio 儲存 blog document
- Document
    - blog document 儲存 每一筆 blog 資料
    - 格式長的很像 JS 的 object or JSON
    - {
        "_id": ObjectId(12345),
        "title": "what a day!",
        "snippet": 'all about the...',
        "body": "blah blah blah..." 
    }
- Example: mangoDB

---

**Mongoose**
![](https://p165.p3.n0.cdn.getcloudapp.com/items/DOurnejJ/ad212491-b966-4b84-9d24-5c3c185c2ba7.png?source=viewer&v=660ee5745cd003e669c21dbc58f5617f)

- ODM library (Object Documnet Mapping Library)
- 它包含原生 MongoDB api，解決原本很多不方便使用的地方，可以輕易的 create simple model 和 MongoDB 做聯繫 (原生的 api 很不好用)
    - User.get()
    - User.findById()
    - Blog.deleteOne()

- How to use?
    - create a schema & models
    1. schema
        - define the structure of a type of data / document
        - properties & property types
        - ex. user schema
            - name(string), required
            - age(number)
            - bio(string), required
    2. model
    ![](https://p165.p3.n0.cdn.getcloudapp.com/items/eDu72koZ/37d1d710-f410-4345-b391-f17304195c25.png?source=viewer&v=0f66fc2a3996c90dddc05d8f359de7ef)
        - create a model based on the schema
        - model allow us to communicate with database collections
        - create a blog model based on the blog schama, blog model will then have static and instance methods(ex. get, save, delete, etc....), which we can use to save, update or read data from the blog's collection

- 相關文件
    - [Express Tutorial Part 3: Using a Database (with Mongoose) - MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose)


---
**Post requests**
- type
    - GET: get all blogs
        - localhost:3000/blogs
    - POST: create a blog
        - localhost:3000/blogs
    - GET: get blog
        - localhost:3000/blogs/:id
    - DELETE: delete a blog
        - localhost:3000/blogs/:id
    - PUT: update a blog
        - localhost:3000/blogs/:id
- 同一個 request url 可以同時 type 是 GET or POST，不影響。

---
**MVC**
- basic knowledge:
    - Model, View, Controller
    - a way of structuring our code & files
    - more modular, reusable, easier to maintain.

- what is a controller?
    - 有點像中間人（郵差），負責在 Model 和 View 之間傳遞任務
    - use Model to get data, then pass the data to View

