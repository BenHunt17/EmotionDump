import { getEmotionEntries, saveEmotionEntries } from "./dataAccess";
import { DaylioObject } from "./types/DaylioObject";
import { EmotionEntryModel } from "./types/EmotionEntryModel";

export async function dumpEmotions(content: Buffer) {
  const convertedContent = Buffer.from(content.toString(), "base64").toString(
    "ascii"
  );

  const daylioObject = JSON.parse(
    removeInvalidControlCharacters(convertedContent)
  ) as DaylioObject | undefined;

  const currentEntries = await getEmotionEntries();

  const entryDates = currentEntries.map(
    (entry) =>
      new Date(entry.year, entry.month, entry.day, entry.hour, entry.minute)
  );
  const mostRecentEntryDate = entryDates.reduce(
    (mostRecent, current) => (current > mostRecent ? current : mostRecent),
    new Date(0)
  );

  const entries =
    daylioObject?.dayEntries?.reduce<EmotionEntryModel[]>(
      (entries, dayEntry) =>
        new Date(
          dayEntry.year ?? 0,
          dayEntry.month ?? 0,
          dayEntry.day ?? 0,
          dayEntry.hour ?? 0,
          dayEntry.minute ?? 0
        ) <= mostRecentEntryDate
          ? entries
          : [
              ...entries,
              {
                minute: dayEntry.minute ?? 0,
                hour: dayEntry.hour ?? 0,
                day: dayEntry.day ?? 0,
                month: dayEntry.month ?? 0,
                year: dayEntry.year ?? 0,
                mood: dayEntry.mood ?? 0,
                note: dayEntry.note ?? "",
                tags:
                  dayEntry.tags?.map(
                    (tagId) =>
                      daylioObject.tags?.find((tag) => tag.id === tagId)
                        ?.name ?? ""
                  ) ?? [],
              },
            ],
      []
    ) ?? [];

  await saveEmotionEntries(entries);

  return true;
}

function removeInvalidControlCharacters(jsonString: string) {
  const invalidControlCharRegex = /[\u0000-\u001F]/g;
  const cleanedJSON = jsonString.replace(invalidControlCharRegex, "");
  return cleanedJSON;
}
