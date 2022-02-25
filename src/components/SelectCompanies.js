import React, {forwardRef, useState, useRef, useMemo} from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

export const SelectCompanies = ({ fetchOptions, debounceTimeout = 1000, ...props },ref) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      labelInValue
      filterOption={false}
      showSearch={true}
      showArrow={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <> <Spin size="small" /> Searching ... </> : null}
      options={options}
      ref={ref}
      {...props}
    />
  );
}

  export default forwardRef(SelectCompanies);