import {Link} from "react-router-dom"
const Postitem =({post,username,userId})=>{
    const profileLink = userId?`/profile/${userId}`:`/profile/${post?.user?._id}`
    return(
        <div className="post-item">
            <div className="post-item-image-wrapper">
                <img src={post?.image.url}alt="" className="post-item-image"/>
            </div>
            <div className="post-item-info-wrapper">
                <div className="post-item-info">
                    <div className="post-item-author">
                        <strong>Author : </strong>
                        <Link to={profileLink} className="post-item-username">{username?username:post?.user.username}</Link>
                    </div>
                    <div className="post-item-data">
                        {new Date(post?.createdAt).toDateString()}
                    </div>
                </div>
                <div className="post-item-details">
                    <h4 className="post-item-title">{post?.title}</h4>
                    <Link className="post-item-category" to={`/posts/categories/${post?.category}`}>
                    {post?.category}
                    </Link>
                </div>
                <p className="post-item-description">
                    {post?.description}
                    Lorem ipsum, dolor sit amet consectetur adi
                    pisicing elit. Distinctio aut consectetur saepe
                    , ullam tempore quam placeat provident, fugit hic, voluptate voluptatem
                     laborum vitae debitis. Excepturi magni neque nemo quos sed.
                     Lorem ipsum, dolor sit amet consectetur adi
                    pisicing elit. Distinctio aut consectetur saepe
                    , ullam tempore quam placeat provident, fugit hic, voluptate voluptatem
                     laborum vitae debitis. Excepturi magni neque nemo quos sed.
                </p>
                <Link className="post-item-link" to={`/posts/details/${post?._id}`}>
                Read more.....
                </Link>
            </div>
        </div>
    )
}
export default Postitem