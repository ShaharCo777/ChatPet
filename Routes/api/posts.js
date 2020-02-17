const express = require('express'),
      router     = express.Router(),
      {check, validationResult} = require('express-validator/check'),
      midAuth = require('../../middleware/midAuth'),
      Post = require('../../models/Post'),
      Profile = require('../../models/Profile'),
      User = require('../../models/User')
      Comment = require('../../models/Comment')



// router.use('/:postId/comments', require('./comments'))

// @route  post api/posts
// @goal   creat a post
// @access  private
router.post('/',
 [midAuth,
     [
    check('text', 'Text is required')
    .not()
    .isEmpty()
]],
 async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const user = await User.findById(req.user.id).select('-password')

        const newPost =new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save()
        console.log(post)
        res.json(post)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server eror')
    }

})

// @route  get api/posts
// @goal   get all posts
// @access  private
router.get('/', midAuth, async (req, res)=>{
    try {
        const posts = await Post.find().sort({date: -1})
        res.json(posts)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server eror')
    }
})

// @route  get api/posts/:id
// @goal   get single post
// @access  private
router.get('/:postId', midAuth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.postId)
        const comments = await Comment.find({ post: req.params.postId})
        .sort({date: -1})
        if(!post){
            return res.status(400).json({msg: 'Post not found'})
        }
        const data = {
            post: post,
            comments: comments
        }
        res.json(data)
    } catch (err) {
        console.error(err.message)
        if(err.kind =='ObjectId'){
            return res.status(400).json({msg: 'Post not found'})
        }
        res.status(500).send('Server eror')
    }
})

// @route  delete api/posts/:id
// @goal   delete a post
// @access  private
router.delete('/:postId', midAuth, async (req, res)=>{
    try {
        const post = await Post.findById(req.params.postId)
        
        //check user
        if(post.user.toString()!= req.user.id){
            return res.status(401).json({msg: 'you can delete only your on posts'})
        }
        await post.remove()
        res.json({msg: 'post remooved'})
        if(!post){
            return res.status(400).json({msg: 'Post not found'})
        }
        res.json(post)
    } catch (err) {
        console.error(err.message)
        if(err.kind =='ObjectId'){
            return res.status(400).json({msg: 'Post not found'})
        }
        res.status(500).send('Server eror')
    }
})

// @route  put api/posts/like/:id
// @goal   like a post
// @access  private
router.put('/like/:postId', midAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ msg:'You have been liked that post'})
        }
        post.likes.unshift({ user: req.user.id})

        await post.save()

        res.json(post.likes)
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


// @route  put api/posts/unlike/:id
// @goal   unlike a post
// @access  private
router.put('/unlike/:postId', midAuth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        if(post.likes.filter(like => like.user.toString() == req.user.id).length == 0){
            return res.status(400).json({ msg:'Post hasent been liked yet'})
        }
        const deletedLike = post.likes.map(like => like.user.toString())
             .indexOf(req.user.id)
        post.likes.splice(deletedLike, 1)
        await post.save()

        res.json(post.likes)
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


// @route  post api/posts/comment/:postId
// @goal   add a comment
// @access  private
router.post(
    '/comment/:postId',
    [
      midAuth,
      [
        check('text', 'Text is required')
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findById(req.user.id).select('-password');
        const comment =new Comment({
            post: req.params.postId,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })
        await comment.save()
        console.log(comment)
        res.json(comment)
      } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
      }
    }
  )
  
  // @route    delete api/posts/comment/:commentId
  // @desc     delete a comment
  // @access   Private
  router.delete('/comment/:commentId', midAuth, async (req, res) => {
    try {
      await Comment.findOneAndRemove({_id: req.params.commentId})
      res.send('comment removed')
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
  })
  
module.exports = router