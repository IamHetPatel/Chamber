import '../styles/developerPage.css'

const DeveloperPage = () => {
  return (
    <>
      <div className='developer-page-container'>
        <div className="explore-projects-container">
          <div className='explore-title'>Explore Projects</div>
          <div className='titles'>
            <div className='explore-column-title'>Projecs</div>
            <div className='explore-column-title'>Pool</div>
            <div className='explore-column-title'>Tokens</div>
          </div>
          <div className='explore-list'>
            <div className='explore-item'>
            <div className='explore-list-project'>Chamber1</div>
            <div className='explore-list-pool'>105K</div>
            <div className='explore-list-token'>22</div>
          </div>
          </div>
        </div>
        <div className="contributors-container">
            <div className="contributors-pride-container">
            <div className='mini-container-title'>
                Contributor&apos;s Pride
            </div>
              <div className='overall-stats-container'>
                <div className='stat-card'>
                  <div className='stat-title'>
                    Issues Solved
                  </div>
                  <div className='stat-data'>
                    99
                  </div>
                </div>
                <div className='stat-card'>
                  <div className='stat-title'>
                    Tokens
                  </div>
                  <div className='stat-data'>
                    69T
                  </div>
                </div>
              </div>
            </div>
            <div className="previous-contributions-container">
              <div className='mini-container-title'>
                Previous Contributions
              </div>
              <div className='previous-contributions-list'>
                <div className='previous-contribution'>
                <div className='pre-cont-name'>Chamber1</div>
                <div className='pre-cont-num'>#1</div>
                <div className='pre-cont-token'>11</div>
                </div>
                <div className='previous-contribution'>
                <div className='pre-cont-name'>Chamber1</div>
                <div className='pre-cont-num'>#1</div>
                <div className='pre-cont-token'>11</div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default DeveloperPage
