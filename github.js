/**
 * github.js — GitHub Contribution Heatmap logic
 *
 * Fetches contribution data from github-contributions-api.deno.dev
 */

document.addEventListener('DOMContentLoaded', () => {
  const GITHUB_USERNAME = 'abdkupang';
  const heatmapContainer = document.getElementById('ghHeatmap');
  const countLabel = document.getElementById('ghContribCount');

  if (!heatmapContainer || !countLabel) return;

  // Render a loading state (empty cells)
  renderHeatmap(generateMockData(true));

  // Fetch real data
  fetch(`https://github-contributions-api.deno.dev/${GITHUB_USERNAME}.json`)
    .then(res => {
      if (!res.ok) throw new Error('API Response not ok');
      return res.json();
    })
    .then(data => {
      // API returned successfully.
      // API format: { totalContributions: number, contributions: [[day, day...], [day, day...] ...] }
      
      const total = data.totalContributions || 0;
      countLabel.textContent = `${total.toLocaleString()} kontribusi di tahun terakhir`;

      // The API returns an array of weeks, each containing an array of days.
      // We need to flatten this into a single array of days.
      const flatDays = data.contributions.flat();

      // Translate quartile string to level 0-4
      const processed = flatDays.map(day => {
        let level = 0;
        if (day.contributionLevel === 'FIRST_QUARTILE') level = 1;
        else if (day.contributionLevel === 'SECOND_QUARTILE') level = 2;
        else if (day.contributionLevel === 'THIRD_QUARTILE') level = 3;
        else if (day.contributionLevel === 'FOURTH_QUARTILE') level = 4;
        
        return { 
          date: day.date,
          count: day.contributionCount,
          level 
        };
      });

      renderHeatmap(processed);
    })
    .catch(err => {
      console.warn('GitHub API failed, falling back to mock data.', err);
      // Fallback
      const mock = generateMockData(false);
      const totalMock = mock.reduce((sum, d) => sum + (d.count || 0), 0);
      countLabel.textContent = `${totalMock.toLocaleString()} kontribusi di tahun terakhir`;
      renderHeatmap(mock);
    });

  /**
   * Renders the grid of cells
   */
  function renderHeatmap(days) {
    heatmapContainer.innerHTML = '';
    
    days.forEach(day => {
      const cell = document.createElement('div');
      cell.className = `gh-cell gh-l${day.level}`;
      if (day.date && day.count !== undefined) {
        cell.title = `${day.count} kontribusi pada ${day.date}`;
      }
      heatmapContainer.appendChild(cell);
    });
    
    // Scroll to the end (right side) to show most recent activity
    const scrollContainer = document.querySelector('.gh-heatmap-scroll');
    if (scrollContainer) {
      setTimeout(() => {
        scrollContainer.scrollLeft = scrollContainer.scrollWidth;
      }, 100);
    }
  }

  /**
   * Generates 365 days of mock data
   * @param {boolean} emptyOnly - If true, returns all level 0 (for loading state)
   */
  function generateMockData(emptyOnly) {
    const days = [];
    const today = new Date();
    // Start 364 days ago
    const start = new Date(today.getTime() - (364 * 24 * 60 * 60 * 1000));
    
    for (let i = 0; i <= 364; i++) {
      const date = new Date(start.getTime() + (i * 24 * 60 * 60 * 1000));
      const dateStr = date.toISOString().split('T')[0];
      
      let level = 0;
      let count = 0;
      
      if (!emptyOnly) {
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        let prob = isWeekend ? 0.2 : 0.6;
        if (i > 300) prob += 0.2;
        
        if (Math.random() < prob) {
          count = Math.floor(Math.random() * 12) + 1;
          if (count > 0 && count <= 2) level = 1;
          else if (count > 2 && count <= 5) level = 2;
          else if (count > 5 && count <= 9) level = 3;
          else level = 4;
        }
      }
      
      days.push({ date: dateStr, count, level });
    }
    
    return days;
  }
});
