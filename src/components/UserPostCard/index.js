import {Component} from 'react'
import {BsHeart} from 'react-icons/bs'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'

import './index.css'

class UserPostCard extends Component {
  state = {
    isLiked: false,
    likedStatus: false,
    counter: 0,
    commentShow: false,
    commentInput: '',
    commentList: [],
  }

  renderPostLikeStatus = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const {userPostDetails} = this.props
    const {postId} = userPostDetails

    const {likedStatus} = this.state
    console.log(likedStatus)

    const apiUrl = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'POST',
      body: JSON.stringify({like_status: likedStatus}),
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok === true) {
      const fetchedPostId = await response.json()
      console.log(fetchedPostId)
    }
  }

  onclickLikeIncrement = () => {
    this.setState({isLiked: true})
    this.setState(preState => ({counter: preState.counter + 1}))
    this.setState({likedStatus: true}, this.renderPostLikeStatus)
  }

  onClickLikeDecrement = () => {
    this.setState({isLiked: false})
    this.setState(preState => ({counter: preState.counter - 1}))
    this.setState({likedStatus: false}, this.renderPostLikeStatus)
  }

  onCommentToggle = () => {
    this.setState(preState => ({commentShow: !preState.commentShow}))
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {commentInput} = this.state

    const newComment = {
      comment: commentInput,
    }

    this.setState(preState => ({
      commentList: [...preState.commentList, newComment],

      commentInput: '',
    }))
  }

  render() {
    const {userPostDetails} = this.props
    const {
      profilePicture,
      userId,
      userName,
      createdAt,
      likesCount,
      userComments,

      imageUrl,
      caption,
    } = userPostDetails

    const {
      isLiked,
      likedStatus,
      commentShow,
      commentList,
      commentInput,
    } = this.state
    console.log(likedStatus)
    console.log(commentInput)

    return (
      <li className="user-Post-Container">
        <div className="user-Post-content">
          <div className="user-profile-container">
            <img
              className="user-profile-img"
              src={profilePicture}
              alt="post author profile"
            />
            <Link to={`/users/${userId}`} className="nav-link">
              {' '}
              <p>{userName}</p>
            </Link>
          </div>
          <img src={imageUrl} alt="post" className="post-img" />
          <div className="post-detail-and-share-detail-container">
            <div className="reaction-container">
              {isLiked ? (
                <button type="button" onClick={this.onClickLikeDecrement}>
                  <FcLike size={15} />
                </button>
              ) : (
                <button type="button" onClick={this.onclickLikeIncrement}>
                  <BsHeart size={15} />
                </button>
              )}
              <button type="button" onClick={this.onCommentToggle}>
                <FaRegComment />
              </button>

              <BiShareAlt />
            </div>
            <p>{isLiked ? likesCount + 1 : likesCount} likes</p>

            <p>{caption}</p>

            {commentShow && (
              <form
                className="form-comment-container"
                onSubmit={this.onAddComment}
              >
                <textarea
                  value={commentInput}
                  placeholder="Your Comment"
                  onChange={this.onChangeCommentInput}
                  rows="1"
                />
                <button type="submit">Comment</button>
              </form>
            )}

            <div className="post-details">
              <ul className="comment-item">
                {commentList.map(eachComment => (
                  <li key={eachComment.id} className="comment-container">
                    <p>{eachComment.comment}</p>
                  </li>
                ))}
              </ul>
              <ul className="comment-item">
                {userComments.map(eachItem => (
                  <li key={eachItem.user_id} className="comment-container">
                    <p>
                      {' '}
                      <span>{eachItem.user_name}</span> {eachItem.comment}
                    </p>
                  </li>
                ))}
              </ul>

              <p>{createdAt}</p>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

export default UserPostCard
