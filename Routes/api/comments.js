// const express = require('express'),
//       router     = express.Router(),
//       {check, validationResult} = require('express-validator/check'),
//       midAuth = require('../../middleware/midAuth'),
//       Post = require('../../models/Post'),
//       User = require('../../models/User'),
//       Comment = require("../../models/Comment")


// // @route  post api/posts/comment/:postId
// // @goal   unlike a post
// // @access  private
// router.post(
//     '/',
//     [
//       midAuth,
//       [
//         check('text', 'Text is required')
//           .not()
//           .isEmpty()
//       ]
//     ],
//     async (req, res) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
  
//       try {
//         const user = await User.findById(req.user.id).select('-password');
//         const post = await Post.findById(req.params.postId)
//         console.log(post)
//         console.log(req.params)
//         const newComment =new Comment({
//             text: req.body.text,
//             name: user.name,
//             avatar: user.avatar,
//             user: req.user.id
//         })
//         await newComment.save()
//         await post.comments.unshift(newComment)
//         await post.save()

//         res.json(post.comments)
//       } catch (err) {
//         console.error(err.message)
//         res.status(500).send('Server Error')
//       }
//     }
//   )
  
//   // @route    delete api/posts/comment/:postId/:commentId
//   // @desc     delete comment
//   // @access   Private
//   router.delete('/:commentId', midAuth, async (req, res) => {
//     try {
//       const post = await Post.findById(req.params.postId);
  
//       // Pull out comment
//       const comment = post.comments.find(
//         comment => comment.id === req.params.commentId
//       )
  
//       if (!comment) {
//         return res.status(404).json({ msg: 'Comment does not exist' })
//       }
  
//       if (comment.user.toString() !== req.user.id) {
//         return res.status(401).json({ msg: 'User not authorized' })
//       }
  
//       const removeIndex = post.comments
//         .map(comment => comment.id)
//         .indexOf(req.params.comment_id)
  
//       post.comments.splice(removeIndex, 1)
  
//       await post.save()
  
//       res.json(post.comments);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error')
//     }
//   })
  
// module.exports = router