export function initStartScreen(): void {
  const btn =
    document.getElementById('startBtn');
    console.log('Start button:', btn);
    if (!btn) return;
    
    btn.addEventListener('click', () => {
    const title =
      document.getElementById('title');

    if (!title) return;

    title.style.opacity = '0';

    setTimeout(() => {
      title.style.display = 'none';
    }, 1500);
  });

}