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
        const newPost =new Post({
            text: req.body.text,
            user: req.user.id
        })
        const post = await newPost.save()
        post.user = await User.findById(req.user.id)
        .select('name').select('avatar')
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
        const posts = await Post.find().sort({date: -1}).populate('user', ['name', 'avatar'])
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
        const post = await Post.findById(req.params.postId).populate('user', ['name', 'avatar'])
        const comments = await Comment.find({ post: req.params.postId}).populate('user', ['name', 'avatar'])
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
router.put('/postLike/:postId', midAuth, async (req, res) => {
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
router.put('/postUnlike/:postId', midAuth, async (req, res) => {
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


// @route  put api/posts/like/:id
// @goal   like a comment
// @access  private
router.put('/commentLike/:commentId', midAuth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if(comment.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ msg:'You have been liked that post'})
        }
        comment.likes.unshift({ user: req.user.id})

        await comment.save()

        res.json(comment.likes)
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})


// @route  put api/posts/unlike/:id
// @goal   unlike a comment
// @access  private
router.put('/commentUnlike/:commentId', midAuth, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if(comment.likes.filter(like => like.user.toString() == req.user.id).length == 0){
            return res.status(400).json({ msg:'Post hasent been liked yet'})
        }
        const deletedLike = comment.likes.map(like => like.user.toString())
             .indexOf(req.user.id)
             comment.likes.splice(deletedLike, 1)
        await comment.save()

        res.json(comment.likes)
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
        const comment =new Comment({
            post: req.params.postId,
            text: req.body.text,
            user: req.user.id
        })
        await comment.save()
        comment.user = await User.findById(req.user.id)
        .select('name').select('avatar')
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