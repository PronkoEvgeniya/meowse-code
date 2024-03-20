interface ICompletedLessons {
  [key: string]: number;
}

export const getSmallestUncompletedLesson = (
  lessons: ICompletedLessons,
  totalLessons: number
): number => {
  let uncompletedLesson = 0;
  const keys = Object.keys(lessons)
    .map((id) => Number(id))
    .sort((a, b) => a - b);

  if (keys.length === totalLessons) return 1;

  for (let i = 0; i < keys.length; i++) {
    const current = keys[i];
    const last = keys[keys.length - 1];
    const difference = current - uncompletedLesson;
    if (difference > 1) {
      uncompletedLesson += 1;
      break;
    }

    uncompletedLesson = current;

    if (current === last) {
      uncompletedLesson = last + 1;
    }
  }

  return uncompletedLesson;
};
