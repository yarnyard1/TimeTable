const TITLE_REGEX = /^[A-Za-z][A-Za-z0-9 '\-]{2,59}$/;

function Task(id, title, description, date, time, category) {
  this.id = id || Date.now().toString();
  this.description = description || '';
  this.date = date || '';
  this.time = time || '';
  this.category = category || 'General';

  let _title = '';
  Object.defineProperty(this, 'title', {
    get() {
      return _title;
    },
    set(value) {
      if (!TITLE_REGEX.test(value)) {
        throw new Error(
          'Title must be 3–60 characters, start with a letter, and contain only letters, numbers, spaces, hyphens, or apostrophes.'
        );
      }
      _title = value;
    },
    enumerable: true,
    configurable: true,
  });

  this.title = title; 
}


Task.prototype.getFormattedDate = function () {
  if (!this.date) return 'No date set';
  const [year, month, day] = this.date.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

Task.prototype.getStatus = function () {
  if (!this.date) return 'upcoming';
  const now = new Date();
  const today = now.toISOString().split('T')[0];

  if (this.date < today) return 'overdue';
  if (this.date === today) {
    if (!this.time) return 'today';
    const [h, m] = this.time.split(':').map(Number);
    const taskMinutes = h * 60 + m;
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    return taskMinutes < nowMinutes ? 'overdue' : 'today';
  }
  return 'upcoming';
};

Task.prototype.isDueNow = function () {
  if (!this.date || !this.time) return false;
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  if (this.date !== today) return false;
  const [h, m] = this.time.split(':').map(Number);
  return h === now.getHours() && m === now.getMinutes();
};

export { Task, TITLE_REGEX };
