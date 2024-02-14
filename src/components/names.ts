import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';

const customConfig: Config = {
  dictionaries: [colors, animals],
  separator: '-',
  length: 2,
};

const randomName: string = uniqueNamesGenerator({
  dictionaries: [adjectives, colors, animals]
}); // big_red_donkey

const shortName: string = uniqueNamesGenerator(customConfig); // big-donkey

export default shortName;