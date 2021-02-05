import React from 'react';
import { Link } from 'react-router-dom';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Card, CardBody, Row, UncontrolledTooltip } from 'reactstrap';
import placeholderimg from '../../assets/img/placeholder.png';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { connect } from 'react-redux';
import { actions } from '../../shared/store/actions';

class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortName: '',
      sortOrder: '',
      searchText: '',

    };
    this.format = this.format.bind(this);
    //this.handleSubmit=this.handleSubmit.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.onSizePerPageList = this.onSizePerPageList.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.renderShowsTotal = this.renderShowsTotal.bind(this);
    this.getImage = this.getImage.bind(this);
  }



  renderShowsTotal(start, to, paginationShowsTotal) {
    return (
      <span>
        Showing rows { start} to { to} of { paginationShowsTotal}
      </span>
    );
  }


  onSizePerPageList(sizePerPage) {
    let page = 1;
    this.updateProvidersList(page, sizePerPage, this.state.sortName, this.state.sortOrder, this.state.searchText);
  }
  onPageChange(page, sizePerPage) {
    this.updateProvidersList(page, sizePerPage, this.state.sortName, this.state.sortOrder, this.state.defaultSearchText);
  }
  onSortChange(sortName, sortOrder) {
    let page = 1;
    this.updateProvidersList(page, this.state.sizePerPage, sortName, sortOrder, this.state.searchText);
  }
  onSearchChange(searchText, colInfos, multiColumnSearch) {
    let page = 1;
    this.updateProvidersList(page, this.state.sizePerPage, this.state.sortName, this.state.sortOrder, searchText);
  }
  deleteUser = (params) => e => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure to delete?")) {
      this.props.deleteUser(params);
    }

  }

  format(cell, row) {
    return <div className="ca-controls">
      <span><Link id={`${"tooltip-"}${row.id}`} style={{ 'fontSize': 12 }} to={"/users/" + row.id} ><button className="btn btn-info"><MdEdit />
        <UncontrolledTooltip target={`${"tooltip-"}${row.id}`}>Edit User </UncontrolledTooltip>
      </button></Link></span>
      &nbsp;
      &nbsp;

      <span id={`${"tooltipDelete-"}${row.id}`} style={{ 'fontSize': 12 }} ><button onClick={this.deleteUser(row.id)} className="btn btn-danger"><MdDelete />
        <UncontrolledTooltip placement="top" target={`${"tooltipDelete-"}${row.id}`}>View User </UncontrolledTooltip>
      </button></span>

    </div>;
  }



  getImage(cell, row) {
    if (row.avatar)
      return <img src={row.avatar} alt={row.avatar} className="rounded-circle" width="50" height="50" />
    else
      return <img src={placeholderimg} alt="avatar" className="rounded-circle" width="50" height="50" />
  }



  createCustomInsertButton = (onClick) => {
    return (
      <span> &nbsp; <Link to={"/AddUser"} className="btn btn-warning" title="Add Admin"><MdAdd />Add Admin</Link> &nbsp; &nbsp;

      </span>
    );
  }
  componentDidMount() {
    if (!this.props.users.length) {
      this.props.getUsers();
    }
  }
  updateProvidersList(page, sizePerPage, sortName, sortOrder, searchText) {
    if (this.state.searchText && this.state.searchText !== "") {
      searchText = this.state.searchText;
    } else {
      searchText = '';
    }
    this.props.updatePagination({
      page,
      per_page: sizePerPage,
      sort_name: sortName,
      sort_order: sortOrder,
      search_text: searchText
    })
  }
  createCustomInsertButton = () => {
    return (
      <Link to={"/add-user"} className="btn btn-warning" title="Add User"><MdAdd />Add User</Link>
    )
  }
  render() {
    const options = {
      page: this.props.page,  // which page you want to show as default
      insertBtn: this.createCustomInsertButton,
      sizePerPageList: [5, 10, 20, 50], // you can change the dropdown list for size per page

      sizePerPage: this.props.per_page,  // which size per page you want to locate as default

      pageStartIndex: 1, // where to start counting the pages

      paginationSize: 3,  // the pagination bar size.


      paginationPosition: 'bottom',  // default is bottom, top and both is all available

      onPageChange: this.onPageChange,

      onSizePerPageList: this.onSizePerPageList,

      onSortChange: this.onSortChange,

      onSearchChange: this.onSearchChange,


      paginationShowsTotal: this.renderShowsTotal
    };
    return (

      <Row>
        <Card>
          <CardBody>
            <div>
              <BootstrapTable data={this.props.users} remote={true} search={true} pagination={true} fetchInfo={{ dataTotalSize: this.props.total }} multiColumnSearch={true} options={options}
                insertRow
              >
                <TableHeaderColumn dataField='id' isKey={true} searchable={false} dataSort={true} hidden={true}>Company ID</TableHeaderColumn>
                <TableHeaderColumn dataFormat={this.getImage} width={'10%'} dataSort={true}>avatar</TableHeaderColumn>

                <TableHeaderColumn dataField='first_name' dataSort={true}>First Name</TableHeaderColumn>
                <TableHeaderColumn dataField='last_name' dataSort={true}>Last Name</TableHeaderColumn>
                <TableHeaderColumn dataField='email' dataSort={true}>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='actions' width={'20%'} dataFormat={this.format} export={false}>Actions</TableHeaderColumn>
              </BootstrapTable>
            </div>
          </CardBody>
        </Card>
      </Row>

    );
  }
};



const mapStateToProps = ({ user }) => {
  return {
    users: user.data,
    page: user.page,
    per_page: user.per_page,
    total: user.total,
    total_pages: user.total

  }
}
export default connect(mapStateToProps, actions)(UsersPage);
