import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { assign, map } from 'lodash';

import { fetchUser } from '../../actions';
import ListingTable from '../../components/common/listing-table';

class TarzanList extends Component {

    constructor(props, context) {
        super(props);

        this.state = {
            isLoading  : false
        };

        this.__perpage = 20;
    }

    componentWillMount() {
        document.title = 'Succour 2018 Event Volunteers List';
        this.getList();
    }

    render() {
        const { volunteer } = this.props;

        const data = map(volunteer, v => {
            return ({
                id          : v._id,
                name        : v.name,
                gender      : v.gender,
                birthday    : v.birthday,
                phone       : v.phone,
                email       : v.email,
                shirt_size  : v.shirt_size
            })
        })

        const header = ['Name', 'Gender', 'Birthday', 'Phone No.', 'E-Mail', 'Shirt Size'];
    
        return (
            <div>
                <ListingTable 
                    data={data}
                    header={header}
                />
            </div>
        );
    }

    getList() {
        const { query } = this.context;

        // set default query
        const page = (query || {} ).page || 1;

        const params = assign({
            page,
            limit: this.__perpage
        }, query);

        this.setState({ isLoading: true });
        
        this.props.fetchUser(params);
    }
};

const mapStateToProps = ({ volunteer }) => {

    return { volunteer : volunteer.users || [] };
};

export default connect(mapStateToProps, { fetchUser })(TarzanList);

