const config = require('../config')

const userList = [...document.querySelectorAll('.table tbody tr')];
const itemsPerPage = config.listPerPage;
const totalPages = Math.ceil(userList.length / itemsPerPage);

const generatePaginationLinks = () => {
  const paginationLinks = document.querySelector('.pagination');
  paginationLinks.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const link = document.createElement('a');
    link.href = `/users?page=${i}`;
    link.textContent = `${i}`;

    paginationLinks.appendChild(link);
  }
};

generatePaginationLinks();
