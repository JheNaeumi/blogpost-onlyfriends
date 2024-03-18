import { useEffect, useState } from "react"

import { getAuthToken,setAuthHeader } from "../service/AuthService"
import { useNavigate } from "react-router-dom";
import jprofile from "../assets/jprofile.png"
const BlogpostComponent = () => {
  
  const [backendResponse, setBackendResponse] = useState("Nothing");
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
   
          
          //TODO: Replace with a service function
          fetch("http://localhost:8080/messages", {
              method: "GET",
              headers: {'Authorization': `Bearer ${getAuthToken()}`}
          }).then(response => {
              if (response.status == 200) {
                  console.log("Successful")
                  return response.json()
              }else{
                console.log("reponse error")
                  setAuthHeader(null)
                  navigate('/login')
                  
              } 
          }).then(data => {
              setBackendResponse(data.message);
              
          }).catch(()=>{
            setAuthHeader(null)
            navigate('/login')
          })
         
          
          const handleResize = () => {
            setIsFixed(window.innerWidth < 768);
            setIsOpen(window.innerWidth >= 768)
          };
      
          // Initial call to set initial state
          handleResize();
      
          window.addEventListener('resize', handleResize);
      
          return () => {
            window.removeEventListener('resize', handleResize);
          };
      
      }, []);
    
      const toggleSidebar = () => {
        setIsOpen(!isOpen);
      }
  
        
  const people = [{
      name: 'Leslie Alexander',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      caption:'Hello World',
      post: 'Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Leslie Alexander 4th',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      caption:'Hello World',
      post: 'Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Leslie Alexander 2nd',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      caption:'Hello World',
      post: 'Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Leslie Alexander 3rd',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      caption:'Hello World',
      post: 'Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Leslie Alexander 8 th',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      caption:'Hello World',
      post: 'Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Leslie Alexander 5th',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      caption:'Hello World',
      post: 'Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Leslie Alexander 6th',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      caption:'Hello World',
      post: 'Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
    {
      name: 'Leslie Alexander 7th',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      caption:'Hello World',
      post: 'Static websites are now used to bootstrap lots of websites and are becoming the basis for a variety of tools that even influence both web designers and developers influence both web designers and developers',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
    },
  ]
  
  
  return (
    <>  
      <div className="flex h-screen relative ">
       
        <aside className={`bg-white border-r dark:bg-gray-800 dark:border-gray-600 transition-all duration-600 ease-in-out  ${isOpen ? 'block' : 'hidden'} ${isFixed ? 'fixed top-0 left-0 h-full w-64' : 'flex flex-col w-64'} ${isFixed ? 'z-50' : ''}`}>
          {/*TODO: Add an exit button for the sidebar*/}
          <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"onClick={toggleSidebar} >
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close menu</span>
        </button>
          <div className="flex items-center justify-center py-16 h-20 border-b dark:border-gray-600">
            <img src={jprofile} alt="Profile" className="w-12 h-12 rounded-full" />
          </div>
          
          <div className="overflow-y-auto h-full">
            <a href="#" className="flex items-center py-4 border-b dark:border-gray-600">
                <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Dashboard
            </a>
            <a href="#" className="flex items-center py-4 border-b dark:border-gray-600">
                <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Profile
            </a>
            <a href="#" className="flex items-center py-4 border-b dark:border-gray-600">
                <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Log Out
            </a>
            {/* Add more sidebar links as needed */}
          </div>
          <div className="flex items-center justify-center h-20 border-t dark:border-gray-600">
          {/* Add your footer content here */}
          </div>
        </aside>
        {/* Main content */}
        <div className="flex flex-col flex-1">
         
          <div className={`bg-white dark:bg-gray-900 ${isOpen&&isFixed? 'opacity-50': 'bg-white'}`}>
            <div className="py-8 px-4 mx-auto max-w-screen lg:py-16 lg:px-6"> 
              <button onClick={toggleSidebar} className="block md:hidden py-2">
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
              </button>    
              <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8 ">
                  <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Blog</h2>
                  <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
              </div>
              <div className="grid gap-8 lg:grid-cols-2">
                {people.map((person) =>
                <article key={person.name}className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-5 text-gray-500">
                        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                            <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                        {backendResponse}
                        </span>
                        <span className="text-sm">{person.lastSeen}</span>
                    </div>
                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><a href="#">{person.caption}</a></h2>
                    <p className="mb-5 font-light text-gray-500 dark:text-gray-400">{person.post}</p>
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                            <span className="font-medium dark:text-white">
                                {person.name}
                            </span>
                        </div>
                        <span className="flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                            {person.role}
                        </span>
                    </div>
                </article>
                )}              
              </div>  
            </div> 
          </div>
          
        </div>
      </div>
  

    
    </>
    
      
  )
}

export default BlogpostComponent