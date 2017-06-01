import {connect} from 'react-redux';
import { postsFetchData } from '../actions/actions';
import PostsList from '../components/posts/PostsList'


const mapStateToProps = (state) => {
	console.log(state)
    return {

        posts: state.posts,
        hasErrored: state.postsError,
        isLoading: state.postsLoading
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(postsFetchData())

    };
};




export default connect(mapStateToProps, mapDispatchToProps)(PostsList);