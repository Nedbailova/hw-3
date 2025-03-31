import { useNavigate } from 'react-router';
import Card from 'pages/ListRepo/components/Card';
import './ListRepo.scss';
import Text from 'components/Text';
import Button from 'pages/ListRepo/components/Button';
import Input from 'pages/ListRepo/components/Input';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from 'components/Header';
import Pagination from 'pages/ListRepo/components/Pagination';
import MultiDropdown from 'pages/ListRepo/components/MultiDropdown';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  owner: {
    avatar_url: string;
  };
}

const ListRepo = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 9;

  const handleCardClick = (repoName: string) => {
    navigate(`/Repos/${repoName}`);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: 'get',
        url: 'https://api.github.com/orgs/ktsstudio/repos',
      });

      setRepos(result.data);
    };

    fetch();
  }, []);

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  const totalPages = Math.ceil(repos.length / reposPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="list_repo_block">
      <div className="header_block">
        <Header />
      </div>

      <div className="container">
        <div className="title_block">
          <Text view="big-title" weight="bold">
            List of organization repositories
          </Text>
        </div>

        <div className="dropdown_block">
          <MultiDropdown value={'Type'} disabled={true}></MultiDropdown>
        </div>

        <div className="search_block">
          <div className="search_block_input">
            <Input value={inputValue} onChange={handleInputChange} placeholder="Enter organization name" />
          </div>
          <Button search={true} children={''} />
        </div>

        <div className="repo_block">
          {currentRepos.map((repo) => (
            <Card
              key={repo.id}
              image={repo.owner.avatar_url}
              title={repo.name}
              subtitle={repo.description || ''}
              captionSlot="123    Updated 21 Jul"
              onClick={() => handleCardClick(repo.name)}
            />
          ))}
        </div>

        <div className="pagination_block">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
};

export default ListRepo;
