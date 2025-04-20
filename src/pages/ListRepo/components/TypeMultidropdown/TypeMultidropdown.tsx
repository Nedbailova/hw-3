import React, { useCallback, useMemo, useState } from 'react';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { useSearchParams } from 'react-router-dom';
import { repoTypeOptions, RepoTypes } from 'types/repoTypes';

export type TypeMultidropdownProps = {
  className?: string;
  onChange: (types: string[]) => void;
  initialSelected?: string[];
};

const TypeMultidropdown: React.FC<TypeMultidropdownProps> = ({ onChange, initialSelected = ['all'] }) => {
  const [searchParams] = useSearchParams();
  const urlTypes = searchParams.get('types');

  const getInitialSelectedOptions = useMemo(() => {
    const typesToUse = urlTypes ? urlTypes.split(',') : initialSelected;
    return repoTypeOptions.filter((option) => typesToUse.includes(option.key));
  }, [urlTypes, initialSelected]);

  const [selectedTypes, setSelectedTypes] = useState<Option[]>(getInitialSelectedOptions);

  const dropdownOptions = useMemo(() => {
    return repoTypeOptions.filter((option) => option.key !== RepoTypes.ALL);
  }, []);

  const handleTypeChange = useCallback(
    (types: Option[]) => {
      let newTypes = types;

      if (types.length > 1) {
        newTypes = types.filter((t) => t.key !== 'all');
      } else if (types.length === 0) {
        newTypes = [repoTypeOptions[0]];
      }

      setSelectedTypes(newTypes);
      onChange(newTypes.map((type) => type.key));
    },
    [onChange],
  );

  const getTypesTitle = useCallback((types: Option[]) => {
    if (types.length === 0 || (types.length === 1 && types[0].key === 'all')) {
      return '';
    }
    return types.map((type) => type.value).join(', ');
  }, []);

  return (
    <MultiDropdown
      options={dropdownOptions}
      value={selectedTypes}
      onChange={handleTypeChange}
      getTitle={getTypesTitle}
    />
  );
};

export default React.memo(TypeMultidropdown);
