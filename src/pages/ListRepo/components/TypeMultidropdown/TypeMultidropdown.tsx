import React, { useState } from 'react';
import MultiDropdown, { Option } from 'components/MultiDropdown';
import { useSearchParams } from 'react-router-dom';

export type TypeMultidropdownProps = {
  className?: string;
  onChange: (types: string[]) => void;
  initialSelected?: string[];
};

const repoTypeOptions: Option[] = [
  { key: 'all', value: 'All' },
  { key: 'public', value: 'Public' },
  { key: 'private', value: 'Private' },
  { key: 'forks', value: 'Forks' },
  { key: 'sources', value: 'Sources' },
  { key: 'member', value: 'Member' },
];

const TypeMultidropdown: React.FC<TypeMultidropdownProps> = ({
  onChange,
  initialSelected = ['all'],
}) => {
  const [searchParams] = useSearchParams();
  const urlTypes = searchParams.get('types');

  const getInitialSelectedOptions = () => {
    const typesToUse = urlTypes ? urlTypes.split(',') : initialSelected;
    return repoTypeOptions.filter((option) => typesToUse.includes(option.key));
  };

  const [selectedTypes, setSelectedTypes] = useState<Option[]>(getInitialSelectedOptions());

  const handleTypeChange = (types: Option[]) => {
    let newTypes = types;
    const hasAll = types.some((t) => t.key === 'all');

    if (hasAll && types.length > 1) {
      newTypes = types.filter((t) => t.key !== 'all');
    } else if (types.length === 0) {
      newTypes = [repoTypeOptions[0]];
    }

    setSelectedTypes(newTypes);
    onChange(newTypes.map((type) => type.key));
  };

  const getTypesTitle = (types: Option[]) => {
    if (types.length === 0 || (types.length === 1 && types[0].key === 'all')) {
      return '';
    }
    return types.map((type) => type.value).join(', ');
  };

  return (
    <MultiDropdown
      options={repoTypeOptions}
      value={selectedTypes}
      onChange={handleTypeChange}
      getTitle={getTypesTitle}
    />
  );
};

export default TypeMultidropdown;
