import { useEffect, useState, useLayoutEffect } from "react"

import { getAuthToken,setAuthHeader } from "../service/AuthService"
import { useNavigate } from "react-router-dom";
import { deleteUserContent, getPostResponse, postUserContent, updateUserContent } from "../service/PostService";
import { postComment } from "../service/CommentService";
import { getProfile } from "../service/UserDataService";
const BlogpostComponent = () => {
 
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isAuth, setisAuth] = useState(false)
  const [mappedContent, mapContent] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [alltotalPages, setTotalPages] = useState(0);
  const [formData, setFormData] = useState([])
  const [content, setContent] = useState({
    postTitle: '',
    postContent: '',
  },[]) 
  useEffect(() => { 
          getUserProfileData();
          //gePostData
          getPostContent();

          // Initial call to set initial state
          handleResize();
          window.addEventListener('resize', handleResize);
          return () => {
            window.removeEventListener('resize', handleResize);
          };
      
      }, []);
      
      //checksWindowSizeForSideBar
      const handleResize = () => {
        setIsFixed(window.innerWidth < 768);
        setIsOpen(window.innerWidth >= 768)
      };
      //toggleSidebar
      const toggleSidebar = () => {
        setIsOpen(!isOpen);
      }
      //Logging out
      const logOut = () => {
        setAuthHeader(null)
        navigate('/login')
      }
      //changePage
      const handlePageChange = (page) => {
        setCurrentPage(page)
        fetchData(page)
      };
      const getPostContent= async() => {
        fetchData(currentPage);
      }
      const getUserProfileData = async() =>  {
        try {
          const token = getAuthToken()
          const response = await getProfile(token)
          if(response.status === 200){
            setFormData(response.data)
        }
        } catch (error) {
          console.log(error)
        }
      }
      //getPostData
      const fetchData = async (page) => {
        //TODO: Make it as a Service
        try {
          const token = getAuthToken()
          const response = await getPostResponse(token, page)
          setisAuth(true)
          mapContent(response.data.content)
          console.log(response.data.content)
          setTotalPages(response.data.totalPages-1)
          //console.log(response.data.content )
          //console.log("success")
        } catch (error) {
          console.error('Error fetching data:');
          setAuthHeader(null)
          navigate('/login')
        }
      };
      const handlePostUserContent = async(e) => {
        e.preventDefault();
        try{
          const token = getAuthToken()
          const response = await postUserContent(token,content)
          if(response.status === 201){
            console.log('Post succesful')
            setContent('')
            getPostContent()
          }

        }catch(error){
          console.log('Post failed')
          setContent('')
        }
      }
      //if token is not present
      if(!isAuth){
        return null;
      }
  
  return (
    <>  
      <div className="flex h-screen relative">
        <div className={`h-full bg-slate-300 drop-shadow-xl border-r rounded-lg dark:bg-gray-800 dark:border-gray-600 transition-all duration-600 ease-in-out  ${isOpen ? 'block' :'hidden' } ${isFixed ? 'fixed top-0 left-0  w-64' : 'flex flex-col w-64'} ${isFixed ? 'z-50' : ''}`}>
          {/* SideBar Navigation */}
          <div className={`${isFixed? 'block':'hidden'}`}>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"onClick={toggleSidebar} >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center py-14 dark:border-gray-600">
            <img width="96" height="96" src="https://img.icons8.com/windows/96/user.png" alt="user"/>
            <span className="text-xl font-semibold flex justify-center">{formData.firstName} {formData.lastName}</span>
          </div>      
          <div className="overflow-y-auto">
            <ul className="space-y-8 font-medium">
              <li>
                <a href="" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </a>
              </li>  
              <li>
                <a href="/profile" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
                </a>
              </li>
              <li>
                <a href="" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"onClick={logOut}>
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16" >
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Main Content */}
        <div className="flex flex-col flex-1">
          <div className={` h-full overflow-y-auto bg-slate-50 dark:bg-gray-900 ${isOpen&&isFixed? 'opacity-50': ''}`}>
            <div className="py-2 px-4 mx-auto max-w-screen lg:py-4 lg:px-6"> 
              <button onClick={toggleSidebar} className="block md:hidden py-2">
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>
               {/* Create New Post */}    
              <div className="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div>
              <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl rounded-lg">
                <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="Title" type="text" id="postTitle" name="postTitle" required value={content.postTitle || ''} onChange={(e) => setContent({...content, postTitle:e.target.value})}/>
                <textarea className="description bg-gray-100 sec p-3 h-40 border border-gray-300 outline-none" spellCheck="false" placeholder="Describe everything about this post here"name="postContent" id="postContent" required value={content.postContent || ''} onChange={(e)=> setContent({...content, postContent:e.target.value})}></textarea>
                <div className="icons flex text-gray-500 m-2">
                  <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
                </div>
                <div className="buttons flex">
                  <button className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500" onClick={handlePostUserContent}>Post</button>
                </div>
              </div>
               {/* List of Post */}
              <div className="flex justify-center">
                <div className="grid gap-8 grid-cols-1 pt-12 px-2 w-2/3 ">
                  {mappedContent.map((post) => (
                    <Post key={post.id} post={post} getPostContent={getPostContent} formData={formData}/>
                  ))}
                </div>
              </div>  
            </div> 
          </div> 
          <div className="flex ">
            <button disabled={currentPage === 0} onClick={() => handlePageChange(currentPage - 1)} className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Previous
            </button>
            <button disabled={currentPage === alltotalPages} onClick={() => handlePageChange(currentPage + 1)} className="flex items-center justify-center px-4 h-10 ms-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function Post({ post, getPostContent, formData }) {
  const [showComments, setShowComments] = useState(false);
  const [userComment, setCommentText] = useState({
    commentContent:'',
  });
  const [mappedComments, setmappedComments] = useState(post.comments);
  const [showOptions, setShowOptions] = useState(false);
  const [postContent, setUpdatedPostContent] = useState(post.postContent);
  const [postTitle, setUpdatePostTitle] = useState(post.postTitle)
  const [isEditing, setIsEditing] = useState(false);
  const [commentOptionsVisibility, setCommentOptionsVisibility] = useState({});

  const toggleCommentOption = (commentId) => {
    setCommentOptionsVisibility(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId]
    }));
  };
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  
  const handleCancel = () =>{
    setIsEditing(false);
  }
  const handleUpdatePost = async (e) => {
    e.preventDefault()
    try{
    // Call the updatePost function with the updated content
    const updatedTitleAndContent = {postTitle, postContent}
    const token = getAuthToken()
    const response = await updateUserContent(token, post.id, updatedTitleAndContent)
    console.log(response.status)
    // Close the options menu
    setShowOptions(false);
    // Reset editing state
    setIsEditing(false);
    getPostContent();
    }catch(error){
      console.log(error)
    }
  };
  const handleDeletePost = async(e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      await deleteUserContent(token, post.id)
     
      setShowOptions(false);
       getPostContent();
    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdateComment = async (commentId) => {
    // Implement update comment logic here
  };

  const handleDeleteComment = async (commentId) => {
    // Implement delete comment logic here
  };
  const addComment = async(e) => {
    e.preventDefault()
    try {
      const token = getAuthToken()
      const response = await postComment(token, userComment, post.id)
      console.log("Comment Succes", response.status)
      setCommentText('');
      
      setmappedComments([...mappedComments, response.data]);
    } catch (error) {
      console.log(error)
      setCommentText('')
    }

  };

  return (
    <article key={post.id} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-2.5 text-gray-500">
        <span className="bg-primary-100 text-primary-800 text-sm font-medium inline-flex items-center  rounded dark:bg-primary-200 dark:text-primary-800">
          <svg className="mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
          </svg>
          {post.category.categoryTitle} 
        </span>
        {post.user.login === formData.login && (
        <div className="relative text-xs inline-block">
          <div className="flex justify-between items-center text-gray-500">
            <button onClick={toggleOptions} className=" inline-flex w-full bg-white text-gray-700 focus:outline-none focus:ring-10 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
              <svg className=" mt-3 mr-2 h-5 w-5 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 6a2 2 0 100-4 2 2 0 000 4zM2 6a2 2 0 100-4 2 2 0 000 4zm16 0a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          {/* Dropdown menu for Update & Delete*/}
          {showOptions && (
            <div className="origin-top-right absolute right-0  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
              <div className="py-1" role="none">
                <button onClick={() => {setIsEditing(true), setShowOptions(false)}}className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="menu-item-0">Update </button>
                <button onClick={handleDeletePost} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="menu-item-1">Delete </button>
              </div>
            </div>
          )}
        </div>
        )}
      </div>
      <div className="flex text-center">
        <span className="text-gray-500 text-sm">{new Date(post.postCreatedDate).toLocaleString()}</span>
      </div>
      {/*Edit/Update Post*/}
      {isEditing ? (
        <div>
          <input className="w-full text-2xl text-gray-900 dark:text-white px-3 py-2 my-3 font-bold border border-gray-300 rounded-md focus:outline-none focus:border-primary-400" value={postTitle} onChange={(e) => setUpdatePostTitle(e.target.value)}></input>
          <textarea className="mb-5 w-full px-3 py-2 font-light text-gray-500 dark:text-gray-400 border border-gray-300 rounded-md focus:outline-none focus:border-primary-400" rows="6" value={postContent} onChange={(e) => setUpdatedPostContent(e.target.value)} ></textarea>
          <div className="flex justify-end mb-4">
            <button className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500" onClick={handleUpdatePost} >Update</button>
            <button className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500" onClick={handleCancel} >Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{post.postTitle}</h2>
          <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{post.postContent}</p>
        </div>
      )}
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-4">
          <img width="32" height="32" src="https://img.icons8.com/windows/32/user.png" alt="user"/>
          <span className="font-medium dark:text-white">
            {post.user.firstName} {post.user.lastName}
          </span>
        </div>
        <button className="flex items-center" onClick={toggleComments}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 50 50" stroke="currentColor">
            <path d="M 25 4.0625 C 12.414063 4.0625 2.0625 12.925781 2.0625 24 C 2.0625 30.425781 5.625 36.09375 11 39.71875 C 10.992188 39.933594 11 40.265625 10.71875 41.3125 C 10.371094 42.605469 9.683594 44.4375 8.25 46.46875 L 7.21875 47.90625 L 9 47.9375 C 15.175781 47.964844 18.753906 43.90625 19.3125 43.25 C 21.136719 43.65625 23.035156 43.9375 25 43.9375 C 37.582031 43.9375 47.9375 35.074219 47.9375 24 C 47.9375 12.925781 37.582031 4.0625 25 4.0625 Z M 25 5.9375 C 36.714844 5.9375 46.0625 14.089844 46.0625 24 C 46.0625 33.910156 36.714844 42.0625 25 42.0625 C 22.996094 42.0625 21.050781 41.820313 19.21875 41.375 L 18.65625 41.25 L 18.28125 41.71875 C 18.28125 41.71875 15.390625 44.976563 10.78125 45.75 C 11.613281 44.257813 12.246094 42.871094 12.53125 41.8125 C 12.929688 40.332031 12.9375 39.3125 12.9375 39.3125 L 12.9375 38.8125 L 12.5 38.53125 C 7.273438 35.21875 3.9375 29.941406 3.9375 24 C 3.9375 14.089844 13.28125 5.9375 25 5.9375 Z"></path>
          </svg>
        </button>
      </div>
       {/*Option to Show Comments of Each Post */}
      {showComments && (
        <div className="mt-5">
          <h3 className="text-xl font-semibold mb-2">Comments</h3>
          <ul>
            {/* List of Comments*/}
            {mappedComments.slice().sort((a, b) => a.id - b.id).map((comment) => (
              <li key={comment.id} className="flex justify-between items-center mb-4 text-gray-500">
                <div className="flex flex-col mt-2">
                <span className="bg-primary-100 text-primary-800 text-sm font-medium inline-flex items-center  rounded dark:bg-primary-200 dark:text-primary-800">
                  <img width="32" height="32" src="https://img.icons8.com/windows/32/user.png" alt="user"/>
                  {comment.user.firstName} {comment.user.lastName}
                </span>
                <span className="text-gray-500 text-sm">{comment.commentContent}</span>
                </div>
                {formData.login === comment.user.login && (
                  <div className="relative text-xs inline-block">
                    <div className=" flex justify-between text-gray-500">
                      <button onClick={() => toggleCommentOption(comment.id)} className=" bg-white text-gray-700 focus:outline-none focus:ring-10 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                      
                        <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 6a2 2 0 100-4 2 2 0 000 4zM2 6a2 2 0 100-4 2 2 0 000 4zm16 0a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  {/* Dropdown menu for Update & Delete Comment*/}
                    {commentOptionsVisibility[comment.id] && (
                      <div className="origin-top-right absolute top-3 right-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                        <div className=" flex py-1" role="none">
                          <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="menu-item-0">Update </button>
                          <button onClick={() => handleDeleteComment(comment.id)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem" tabIndex="-1" id="menu-item-1">Delete </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary-400" placeholder="Write a comment..." rows="3" name="commentContent" id="commentContent" required value={ userComment.commentContent || ''} onChange={(e) => setCommentText({...userComment, commentContent:e.target.value})} ></textarea>
            <button className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500" onClick={addComment}>Comment</button>
          </div>
        </div>
      )}
    </article>
  );
}


export default BlogpostComponent