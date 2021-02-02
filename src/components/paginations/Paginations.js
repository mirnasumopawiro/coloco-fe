import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Pagination,
	PaginationItem,
	PaginationLink
} from 'reactstrap';

class Paginations extends Component {
	elipsis = (c, m) => {
		var current = c,
			last = m,
			delta = 2,
			left = current - delta,
			right = current + delta + 1,
			range = [],
			rangeWithDots = [],
			l;
	
		for (let i = 1; i <= last; i++) {
			if (i == 1 || i == last || i >= left && i < right) {
				range.push(i);
			}
		}
	
		for (let i of range) {
			if (l) {
				if (i - l === 2) {
					rangeWithDots.push(l + 1);
				} else if (i - l !== 1) {
					rangeWithDots.push('...');
				}
			}
			rangeWithDots.push(i);
			l = i;
		}
	
		return rangeWithDots;
	}

	render() {
		const { currentPage, totalPage, onPaginationClick } = this.props;
		const pageList = this.elipsis(currentPage, totalPage);
		
		if(totalPage <= 1){
			return null;
		}

		return (
			<Pagination>
				<PaginationItem disabled={currentPage === 1}>
					<PaginationLink previous href="#" onClick={() => onPaginationClick(1)}></PaginationLink>
				</PaginationItem>
				{pageList.map((i, index) => (
					<PaginationItem key={index} disabled={i === '...'} active={i !== '...' && i === currentPage}>
						<PaginationLink href="#" onClick={() => onPaginationClick(i)}>{i}</PaginationLink>
					</PaginationItem>
				))}
				<PaginationItem disabled={currentPage === totalPage}>
					<PaginationLink next href="#" onClick={() => onPaginationClick(totalPage)}></PaginationLink>
				</PaginationItem>
			</Pagination>
		);
	}
}

Paginations.propTypes = {
	currentPage: PropTypes.number.isRequired,
	totalPage: PropTypes.number.isRequired,
	onPaginationClick: PropTypes.func.isRequired,
};


export default Paginations;