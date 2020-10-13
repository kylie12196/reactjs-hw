import React from 'react';

export default class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      items: this.props.items,
      currentPage: this.props.currentPage,
      itemsPerPage: 3,
      isPrevActive: null,
      isNextActive: null
    }
  }

  onClickEdit = (e) => {
    this.setState({
      idEdit: e.id,
      isEdit: true,
    })
    this.props.edit(e);
  }

  onClickDelete = (e) => {
    this.setState({
      idDelete: e,
      isEdit: false,
    })
    this.props.delete(this.state);
  }

  handleClick= (event) => {
    let pageId = Number(event.target.id);
    this.setState({
      currentPage: pageId
    });
    this.setActivePagenation(pageId);
  }

  setActivePagenation(pageId) {
    let totalPage = Math.ceil(this.state.items.length / this.state.itemPerPage);
    this.setState({isNextActive: 'disabled'});
    this.setState({isPrevActive: 'disabled'});
    if(totalPage === pageId && totalPage > 1){
      this.setState({isPrevActive: ''});
    }
    else if(pageId === 1 && totalPage > 1){
      this.setState({isNextActive: ''});
    }
    else if(totalPage > 1){
      this.setState({isNextActive: ''});
      this.setState({isPrevActive: ''});
    }
  }

  btnPrevClick= () => {
    let pageId = this.state.currentPage - 1;
    this.setState({ currentPage : pageId});
    this.setActivePagenation(pageId);
  }

  btnNextClick= () => {
    let pageId = this.state.currentPage + 1;
    this.setState({ currentPage : pageId});
    this.setActivePagenation(pageId);
  }

  setActivePagenation= (pageId) => {
    let totalPage = Math.ceil(this.props.items.length / this.state.itemsPerPage);
    this.setState({isNextActive: 'disabled'});
    this.setState({isPrevActive: 'disabled'});
    if(totalPage === pageId && totalPage > 1){
      this.setState({isPrevActive: ''});
    }
    else if(pageId === 1 && totalPage > 1){
      this.setState({isNextActive: ''});
    }
    else if(totalPage > 1){
      this.setState({isNextActive: ''});
      this.setState({isPrevActive: ''});
    }
  }

  render () {
    const { currentPage, itemsPerPage, isPrevActive, isNextActive } = this.state;
    const pageNumbers = [];
    const indexLastItems = currentPage * itemsPerPage;
    const indexFirstItems = indexLastItems - itemsPerPage;
    const currentItems = this.props.items.slice(indexFirstItems, indexLastItems);

    // render page item
    const renderPageItems = currentItems.map((items, index) => {
      return (
        <tr className={`item ${this.props.isEdit ? 'item--edit': ''}`} key={ items.id } id={`item-${ items.id }`}>
          <td className='item__name w-40'>{ items.name }</td>
          <td className='item__email w-40'>{ items.email }</td>
          <td className='item__edit w-10'>
            <button className={`btn btn--edit ${this.props.isEdit ? 'disabled': 'enable'}`} name='edit' onClick={() => this.onClickEdit(items)}>Edit</button>
          </td>
          <td className='item__delete w-10'>
            <button className={`btn btn--delete ${this.props.isEdit ? 'disabled': 'enable'}`} name='delete' onClick={() => this.onClickDelete(items.id)}>Delete</button>
          </td>
        </tr>
      )
    })

    // list page number
    for (let i = 1; i <= Math.ceil(this.props.items.length / this.state.itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
      return(
        <div key={number} className={`${this.state.currentPage === number ? 'active': ''}`} id={number}>
          <span className='pagination__item' id={number} onClick={this.handleClick}>{number}</span>
        </div>
      )
    });

    // Next prev button
    let renderPrevBtn = null;
    if(isPrevActive === 'disabled') {
      renderPrevBtn = <div className={isPrevActive}><span className='pagination__item' id='btnPrev'> Prev </span></div>
    }
    else{
      renderPrevBtn = <div className={isPrevActive}><span className='pagination__item' id='btnPrev' onClick={this.btnPrevClick}> Prev </span></div>
    }

    let renderNextBtn = null;
    if(isNextActive === 'disabled') {
      renderNextBtn = <div className={isNextActive}><span className='pagination__item' id='btnNext'> Next </span></div>
    }
    else{
      renderNextBtn = <div className={isNextActive}><span className='pagination__item' id='btnNext' onClick={this.btnNextClick}> Next </span></div>
    }

    return (
      <tbody>
        {renderPageItems}
        <tr className='pagination'>
          <td className='pagination__item'>
            {renderPrevBtn}
          </td>
          <td colSpan={3} className='pagination__item'>
            {renderPageNumbers}
          </td>
          <td className='pagination__item'>
            {renderNextBtn}
          </td>
        </tr>
      </tbody>
    );
  }
}