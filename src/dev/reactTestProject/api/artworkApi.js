import client from "./client.js";

export const artworkApi = {
  getMyArtworks: (page = 0) => client.get(`/artworks?page=${page}`),

  createArtwork: (data) => client.post("/artworks", data),

  updateArtwork: (id, data) => client.put(`/artworks/${id}`, data),

  getArtworkDetail: (id) => client.get(`/artworks/${id}`),

  deleteArtwork: (id) => client.delete(`/artworks/${id}`),
};
