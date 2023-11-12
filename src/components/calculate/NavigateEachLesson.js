"use client";
import { useMemo } from "react";

const useNavigationLessons = (sections, currentLessonUuid) => {
  const currentLessonIndex = useMemo(
    () =>
      currentLessonUuid &&
      sections?.findIndex((section) =>
        section.lessons.some((lesson) => lesson.uuid === currentLessonUuid)
      ),
    [sections, currentLessonUuid]
  );

  const currentSection = useMemo(
    () =>
      currentLessonIndex !== -1 && sections?.length > currentLessonIndex
        ? sections[currentLessonIndex]
        : null,
    [sections, currentLessonIndex]
  );

  const currentLessonInSectionIndex = useMemo(
    () =>
      currentSection &&
      currentLessonUuid &&
      currentSection.lessons?.findIndex((lesson) => lesson.uuid === currentLessonUuid),
    [currentSection, currentLessonUuid]
  );

  const hasNextLessonInSection = useMemo(
    () => currentLessonInSectionIndex !== -1 && currentLessonInSectionIndex + 1 < currentSection?.lessons?.length,
    [currentLessonInSectionIndex, currentSection]
  );

  const nextLessonInSection = useMemo(
    () => (hasNextLessonInSection ? currentSection?.lessons[currentLessonInSectionIndex + 1] : null),
    [hasNextLessonInSection, currentSection, currentLessonInSectionIndex]
  );

  const hasPreviousLessonInSection = useMemo(
    () => currentLessonInSectionIndex !== -1 && currentLessonInSectionIndex > 0,
    [currentLessonInSectionIndex]
  );

  const previousLessonInSection = useMemo(
    () => (hasPreviousLessonInSection ? currentSection?.lessons[currentLessonInSectionIndex - 1] : null),
    [hasPreviousLessonInSection, currentSection, currentLessonInSectionIndex]
  );

  const hasPreviousLesson = useMemo(
    () => (hasPreviousLessonInSection || currentLessonIndex > 0),
    [hasPreviousLessonInSection, currentLessonIndex]
  );

  const previousLesson = useMemo(() => {
    if (!hasPreviousLesson) return null;
    if (hasPreviousLessonInSection) return previousLessonInSection;

    const previousSection = sections[currentLessonIndex - 1];
    const previousSectionLastLessonIndex = previousSection?.lessons?.length - 1;
    return previousSection?.lessons?.[previousSectionLastLessonIndex];
  }, [hasPreviousLesson, hasPreviousLessonInSection, currentLessonIndex, previousLessonInSection, sections]);

  const hasNextLesson = useMemo(
    () => (hasNextLessonInSection || currentLessonIndex + 1 < sections?.length),
    [hasNextLessonInSection, currentLessonIndex, sections]
  );

  const nextLesson = useMemo(() => {
    if (!hasNextLesson) return null;
    return hasNextLessonInSection ? nextLessonInSection : sections[currentLessonIndex + 1]?.lessons?.[0];
  }, [hasNextLesson, hasNextLessonInSection, currentLessonIndex, nextLessonInSection, sections]);

  return {
    previousLesson,
    nextLesson,
  };
};

export default useNavigationLessons;
