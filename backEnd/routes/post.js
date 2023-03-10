const router = require('express').Router()
const Post = require('../models/Post')
const bodyParser = require('body-parser')
const cors = require('cors')

router.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
router.use(bodyParser.json())

// parse application/x-www-form-urlencoded
router.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));



//create new post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body)

    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (error) {
        res.status(500).json(error)

    }


})

//update the post 
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

            try {
                
                const updatedPost = await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: req.body,
                    },
                    { new: true })

                res.status(200).json(updatedPost)
            } catch (error) {

                res.status(500).json(error)
            }
        }


     catch (error) {
        res.status(500).json(err)
    }
})


// delete your post 
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
      try {
                await post.delete()

                res.status(200).json(" post has been deleted")
            } catch (error) {

                res.status(500).json(error)
            }
        } 


     catch (error) {
        res.status(500).json(err)
    }
})



// Get the post 

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)

    } catch (error) {
        res.status(500).json(error)

    }
})

//Get all post
router.get("/", async (req, res) => {
    try {
            posts = await Post.find();
            res.status(200).json(posts);
        }
        
    catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router