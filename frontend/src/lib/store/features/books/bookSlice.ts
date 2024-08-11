import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Book = {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
    searchInfo: SearchInfo;
};

type VolumeInfo = {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: IndustryIdentifier[];
    readingModes: ReadingModes;
    pageCount: number;
    printType: string;
    categories: string[];
    averageRating: number;
    ratingsCount: number;
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: PanelizationSummary;
    imageLinks: ImageLinks;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
};

type IndustryIdentifier = {
    type: string;
    identifier: string;
};

type ReadingModes = {
    text: boolean;
    image: boolean;
};

type PanelizationSummary = {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
};

type ImageLinks = {
    smallThumbnail: string;
    thumbnail: string;
};

type SaleInfo = {
    country: string;
    saleability: string;
    isEbook: boolean;
};

type AccessInfo = {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: FormatAvailability;
    pdf: FormatAvailability;
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
};

type FormatAvailability = {
    isAvailable: boolean;
};

type SearchInfo = {
    textSnippet: string;
};

type BookState = {
  books: Book[];
};

const initialState: BookState = {
  books: [],
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book>) {
      state.books = [action.payload]; // Replace the old state with the new book
    },
    removeBooks(state) {
      state.books = []; // Clear all books from the state
    },
  },
});

export const { setBooks, removeBooks } = bookSlice.actions;

export default bookSlice.reducer;
