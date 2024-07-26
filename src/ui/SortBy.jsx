import { useSearchParams } from "react-router-dom";
import Select from './Select';


function SortBy({ options }) {

  const [searchParams, setSearchParams] = useSearchParams();
  const currentParam = searchParams.get('sortBy') || 'name-asc';

  function handleChange(e) {
    const value = e.target.value;
    searchParams.set('sortBy', value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      onChange={handleChange}
      value={currentParam}
      type="white"
    />
  )
}

export default SortBy;
