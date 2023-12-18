import React, { useEffect, useState } from 'react';
import '../css/Dashboard.css';
import Sidebar from '../Sidebar';
import Top from '../Top';
import '../css/style.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import '../css/joditeditor.css'



const Alllibrary = () => {
    const nav=useNavigate();
  const [user,setUsers]=useState([]);
  const type=localStorage.getItem('type')
  // 
const itemsPerPage = 10;
const [searchInput, setSearchInput] = useState('');
const [currentPage, setCurrentPage] = useState(0);
const filteredData = user.filter((user) =>
  user.title.toLowerCase().includes(searchInput.toLowerCase()) || user.shortDescription.toLowerCase().includes(searchInput.toLowerCase()) || user.category.toLowerCase().includes(searchInput.toLowerCase()) 
);
const totalPages = Math.ceil(filteredData.length / itemsPerPage);
const startIndex = currentPage * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const displayedItems = filteredData.slice(startIndex, endIndex);

const handleSearchChange = (e) => {
  setSearchInput(e.target.value);
  setCurrentPage(0); // Reset to the first page when searching
};

const handlePageChange = (selectedPage) => {
  setCurrentPage(selectedPage.selected);
};
// 
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
        nav('/')
    }
  }, []);
// 
function getlibrary(){
  axios.get('/api/libraryItem/getalllibrary')
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);

      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
}
// 
  useEffect(() => {
    getlibrary();
  }, []);

  const Deletehandler = async (id) => {
    console.log(id);
    try {
      await axios.delete('/api/libraryItem/deletelibrary/'+id,{ timeout: 1000 })
      console.log("libarary deleted");

    } catch (err) {
      console.log(err);
      
    }
    console.log("libarary deleted");
    toast.success("libarary deleted");
    getlibrary();
    // window.location.reload();

  
  }

  return (
    <div>
      <body id="page-top">

        {/*  <!-- Page Wrapper --> */}
        <div id="wrapper">

          {/*  <!-- Sidebar --> */}
          <Sidebar />
          {/*  <!-- End of Sidebar --> */}

          {/*  <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">

            {/*  <!-- Main Content --> */}
            <div id="content">

              {/*  <!-- Topbar --> */}
              <Top />
              {/*  <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div className="container-fluid">

                {/* main contents */}

                <div className='k'>
                  <table class="table">
                    <thead>
                      <tr style={{textAlign:'center'}}  >
                        <td style={{ textAlign: 'center',width:'60rem' }} colSpan='3'>
                         Search library Item
                        </td>
                        <td colSpan={4}>
                          <input                         class="form-control"
                            type="text"
                            placeholder="Search items"
                            value={searchInput}
                            onChange={handleSearchChange}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Short Desc</th>
                        <th scope="col">Category</th>
                        <th scope="col">Nature</th>
                        <th scope="col">Project Name</th>
                        <th scope="col">Private / Public</th>
                        <th scope="col">Image</th>
                        <th scope="col">File</th>
                        {/* <th scope="col">Long Desc</th> */}
                        <th scope="col">Approve / Not Approve</th>
                        {
                          type && type == "user" ? (''):(<th scope="col">Actions</th>)
                        }
                        
                      </tr>
                    </thead>
                    <tbody>
                      {displayedItems.map((user, index) => (
                        <tr >
                          <th scope="row">{index+1}</th>
                          <td>{user.title}</td>
                          <td>{user.shortDescription}</td>
                          <td>{user.category}</td>
                          <td>{user.nature}</td>
                          <td>{user.project}</td>
                          <td>{user.credentials}</td>
                          <td><img src={`/library/images/`+user.image} style={{width:'50px',height:'50px'}} alt={user.image}/></td>
                          {/* <td>{user.image} </td> */}
                          <td><a href={`http://localhost:8000/library/images/`+user.file} target="_blank">{user.file}</a></td>

                          {/* <td>{user.longDescription}</td> */}
                          <td>{user.approve == '1' ? 'Approve' :'Not Approve'}</td>
                          {
                          type && type == "user" ? (''):(
                            <td>
                            <Link to={`/Updates/Updatelibrary/${user._id}`} className='btn btn-primary'>Edit Record</Link>
                           <input type='button' value="Delete" className='btn btn-danger' onClick={e=>Deletehandler(user._id)} style={{ marginLeft: '10px',marginTop:'3px' }}  />
                         </td>
                            )

                          }
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                   {/* paginator */}
                   <ReactPaginate
                    previousLabel={<button className='btn btn-outline-primary'>'Previous'</button>}
                    nextLabel={<button className='btn btn-outline-primary'>'Next'</button>}
                    breakLabel={'...'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination justify-content-center'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                  />
                  
                  {/* end paginator */}
                </div>
                {/* end of the contents */}

              </div>
              {/*   <!-- /.container-fluid --> */}

            </div>
            {/*   <!-- End of Main Content -->

                                        <!-- Footer --> */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  {/* <span>Copyright &copy; Your Website 2021</span> */}
                  <span>Powered by Arure Technologies</span>

                </div>
              </div>
            </footer>
            {/* <!-- End of Footer --> */}

          </div>
          {/*  <!-- End of Content Wrapper --> */}

        </div>
        {/*  <!-- End of Page Wrapper -->

                                <!-- Scroll to Top Button--> */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>

        {/*  <!-- Logout Modal--> */}
        <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                <a className="btn btn-primary" href="login.html">Logout</a>
              </div>
            </div>
          </div>
        </div>

      </body>
    </div>
  )
}

export default Alllibrary
