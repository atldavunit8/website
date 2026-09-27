interface PublishableEntry {
  data: {
    publishStatus: 'draft' | 'published';
    sample: boolean;
  };
}

export function isPublished(entry: PublishableEntry): boolean {
  return entry.data.publishStatus === 'published' && entry.data.sample !== true;
}
