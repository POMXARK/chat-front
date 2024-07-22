import PropTypes from "prop-types";
import { AsyncPaginate } from "react-select-async-paginate";

const SelectAsyncPaginate = (props) => {

  const loadOptions = async (searchQuery, loadedOptions, { page }) => {
    
    console.log(`loading page:${page} - limit: 10`);

    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };

    const response = await fetch(
        import.meta.env.VITE_APP_BACKEND_URL_API + `/users?page=${page}`, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        }
    );


    const responseJSON = await response.json();
    console.log(responseJSON)

    return {
      options: responseJSON.users,
      hasMore: responseJSON.users.length >= 1,
      additional: {
        page: searchQuery ? 2 : page + 1,
      },
    };
  };

  const onChange = (option) => {
    if (typeof props.onChange === "function") {
      props.onChange(option);
    }
  };

  return (
    <AsyncPaginate
      key={(option) => option.userId}
      value={props.value || ""}

      loadOptions={loadOptions}
      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
      getOptionValue={(option) => option.userId}
      onChange={onChange}
      isSearchable={false}
      placeholder="Select User"
      additional={{
        page: 1,
      }}
    />
  );
};

SelectAsyncPaginate.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
};

export default SelectAsyncPaginate;
