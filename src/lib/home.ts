import type { CollectionEntry } from 'astro:content';

type Award = CollectionEntry<'awards'>;
type Project = CollectionEntry<'projects'>;

export const awardLevels = ['National', 'State', 'International'] as const;

export function getAwardTotals(awards: Award[]) {
  const wins = awards.filter((award) => award.data.achievementType === 'Award');
  return Object.fromEntries(
    awardLevels.map((level) => [level, wins.filter((award) => award.data.level === level).length]),
  ) as Record<(typeof awardLevels)[number], number>;
}

export function getAwardWinningProjects(projects: Project[], awards: Award[]) {
  return projects
    .map((project) => ({
      project,
      awards: awards.filter(
        (award) => award.data.achievementType === 'Award' && award.data.projectId === project.id,
      ),
    }))
    .filter(({ awards: linkedAwards }) => linkedAwards.length > 0)
    .map(({ project, awards: linkedAwards }) => ({
      project,
      awards: [...linkedAwards].sort((a, b) =>
        Number(b.data.featured) - Number(a.data.featured) ||
        (b.data.academicYear ?? String(b.data.year ?? '')).localeCompare(a.data.academicYear ?? String(a.data.year ?? '')),
      ),
    }))
    .sort((a, b) =>
      Number(b.awards.some((award) => award.data.featured)) - Number(a.awards.some((award) => award.data.featured)) ||
      (b.project.data.year ?? 0) - (a.project.data.year ?? 0) ||
      a.project.data.title.localeCompare(b.project.data.title),
    );
}
