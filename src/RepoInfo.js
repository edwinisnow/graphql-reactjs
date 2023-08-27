import React from 'react';

const RepoInfo = ({ repo }) => {
  let license;
  switch (repo.licenseInfo?.spdxId) {
    case undefined:
      license = (
        <span className='px-1 py-0 ms-1 d-inline-block btn btn-sm btn-danger'>
          No license
        </span>
      );
      break;
    case 'NOASSERTION':
      license = (
        <span className='px-1 py-0 ms-1 d-inline-block btn btn-sm btn-warning'>
          {repo.licenseInfo.spdxId}
        </span>
      );
      break;
    default:
      license = (
        <span className='px-1 py-0 ms-1 d-inline-block btn btn-sm btn-success'>
          {repo.licenseInfo.spdxId}
        </span>
      );
  }
  return (
    <li className='list-group-item' key={repo.id.toString()}>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='d-flex flex-column'>
          <a className='mb-0 text-decoration-none' href={repo.url}>
            {repo.name}
          </a>
          <p className='small'>{repo.description || 'description'}</p>
        </div>
        <div className='text-nowrap ms-3'>
          {license}
          <span
            className={
              'px-1 py-0 ms-1 d-inline-block btn btn-sm ' +
              (repo.viewerSubscription === 'SUBSCRIBED'
                ? 'btn-success'
                : 'btn-outline-secondary')
            }
            style={{ fontSize: '.6em' }}
          >
            {repo.viewerSubscription}
          </span>
        </div>
      </div>
    </li>
  );
};

export default RepoInfo;
