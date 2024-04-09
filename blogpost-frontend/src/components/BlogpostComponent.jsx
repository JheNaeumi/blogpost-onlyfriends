import { useEffect, useState } from "react"

import { getAuthToken,setAuthHeader } from "../service/AuthService"
import { useNavigate } from "react-router-dom";
import jprofile from "../assets/jprofile.png"
import { getPostResponse } from "../service/PostService";
const BlogpostComponent = () => {
 
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isAuth, setisAuth] = useState(false)
  const [mappedContent, mapContent] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [alltotalPages, setTotalPages] = useState(0);
  const [showComments, setShowComments] = useState(false);
  useEffect(() => { 
          //gePostData
          fetchData(currentPage);

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
      //getPostData
      const fetchData = async (page) => {
        //TODO: Make it as a Service
        try {
          const token = getAuthToken()
          const response = await getPostResponse(token, page)
          setisAuth(true)
          mapContent(response.data.content)
          setTotalPages(response.data.totalPages-1)
          //console.log(response.data.content )
          //console.log("success")
        } catch (error) {
          console.error('Error fetching data:');
          setAuthHeader(null)
          navigate('/login')
        }
      };
      const toggleComments = () => {
        setShowComments(!showComments);
      };
      //if token is not present
      if(!isAuth){
        return null;
      }
  
  return (
    <>  
      <div className="flex h-screen relative">
        <div className={`h-full bg-slate-300 drop-shadow-xl border-r rounded-lg dark:bg-gray-800 dark:border-gray-600 transition-all duration-600 ease-in-out  ${isOpen ? 'block' :'hidden' } ${isFixed ? 'fixed top-0 left-0  w-64' : 'flex flex-col w-64'} ${isFixed ? 'z-50' : ''}`}>
           {/*TODO: Add an exit button for the sidebar*/}
          <div className={`${isFixed? 'block':'hidden'}`}>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"onClick={toggleSidebar} >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <div className="flex items-center justify-center py-12 h-40 dark:border-gray-600">
            <img src={jprofile} alt="Profile" className="w-24 h-24 rounded-full" />
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
            {/* Add more sidebar links as needed */}
          </div>
          {/* <div className="flex items-center justify-center h-20 border-t dark:border-gray-600">
          </div> */}
        </div>
        {/* Main content */}
     
        <div className="flex flex-col flex-1">
         
          <div className={` h-full overflow-y-auto bg-slate-50 dark:bg-gray-900 ${isOpen&&isFixed? 'opacity-50': ''}`}>
            <div className="py-2 px-4 mx-auto max-w-screen lg:py-4 lg:px-6"> 
              <button onClick={toggleSidebar} className="block md:hidden py-2">
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>    
              {/* <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8 ">
                  <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Blog</h2>
                  <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
              </div> */}
              <div class="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div>
              <div class="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl rounded-lg">
                <input class="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellcheck="false" placeholder="Title" type="text"/>
                <textarea class="description bg-gray-100 sec p-3 h-40 border border-gray-300 outline-none" spellcheck="false" placeholder="Describe everything about this post here"></textarea>
                
              
                <div class="icons flex text-gray-500 m-2">
                  <svg class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <svg class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <svg class="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                  <div class="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
                </div>
              
                <div class="buttons flex">
                  <div class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancel</div>
                  <div class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="grid gap-8 grid-cols-1 pt-12 px-2 w-2/3 ">
                {mappedContent.map((post) => (
                  <Post key={post.id} post={post} />
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
function Post({ post }) {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <article key={post.id} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
          <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
          </svg>
          {post.category.categoryTitle}
        </span>
        <span className="text-sm">{new Date(post.postCreatedDate).toLocaleString()}</span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">{post.postTitle}</a></h2>
      <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{post.postContent}</p>
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-4">
          <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
          <span className="font-medium dark:text-white">
            {post.user.firstName} {post.user.lastName}
          </span>
        </div>
        <button className="flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline" onClick={toggleComments}>
          Comments
        </button>
      </div>
      {showComments && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Comments</h3>
          {/* Example comment section */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center space-x-4">
              <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
              <span className="font-medium dark:text-white">John Doe</span>
            </div>
            <p className="mt-2 text-gray-600">This is a comment.</p>
          </div>
        </div>
      )}
    </article>
  );
}

export default BlogpostComponent