const domManip = () => {
  const search = document.getElementById('search');
  const loading = document.getElementById('loading');
  const input = document.getElementById('searchInput');
  const form = document.getElementById('form');
  const city = document.getElementById('city');
  const description = document.getElementById('description');
  const temp = document.getElementById('temp');
  const feel = document.getElementById('feel');
  const humidity = document.getElementById('humidity');
  const alert = document.getElementById('alert');
  const danger = document.getElementById('danger');
  const icon = document.getElementById('icon');
  const deg = document.getElementById('deg');
  const fahr = document.getElementById('fahr');
  const details1 = document.getElementById('details1');
  const details2 = document.getElementById('details2');
  const img = document.createElement('img');

  icon.appendChild(img);

  return {
    search,
    loading,
    input,
    form,
    city,
    description,
    temp,
    feel,
    humidity,
    alert,
    danger,
    icon,
    deg,
    fahr,
    details1,
    details2,
    img,
  };
};

export default domManip;
