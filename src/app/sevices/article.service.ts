import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Article } from '../interfaces/article';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  async createArtile(
    article: Omit<
      Article,
      'id' | 'thumbnailURL' | 'logo' | 'image1' | 'image2' | 'updatedAt'
    >,
    images: {
      thumbnailURL: File;
      logo: File;
      image1?: File;
      image2?: File;
    }
  ) {
    const id = this.db.createId();
    const urls = await this.uploadImage(id, Object.values(images));
    const [thumbnailURL, logo, image1, image2] = urls;
    return this.db.doc<Article>(`articles/${id}`).set({
      ...article,
      id,
      updatedAt: firestore.Timestamp.now(),
      thumbnailURL,
      logo,
      image1,
      image2,
    });
  }

  async uploadImage(id: string, files: File[]): Promise<string[]> {
    return Promise.all(
      files.map((file, index) => {
        const ref = this.storage.ref(`articles/${id}-${index}`);
        return ref.put(file);
      })
    ).then(async (tasks) => {
      const urls = [];
      for (const task of tasks) {
        urls.push(await task.ref.getDownloadURL());
      }
      return urls;
    });
  }

  getArticle(articleId: string): Observable<Article> {
    return this.db.doc<Article>(`articles/${articleId}`).valueChanges();
  }

  getArticles(): Observable<Article[]> {
    return this.db
      .collection<Article>('articles', (ref) => {
        return ref.limit(15);
      })
      .valueChanges();
  }

  async updateArticle(
    article: Omit<
      Article,
      'thumbnailURL' | 'logo' | 'image1' | 'image2' | 'createdAt'
    >,
    images: {
      thumbnailURL?: File;
      logo?: File;
      image1?: File;
      image2?: File;
    }
  ): Promise<void> {
    const id: any = this.db.createId;
    const urls = await this.uploadImage(article.id, Object.values(images));
    const [thumbnailURL, logo, image1, image2] = urls;
    return this.db.doc<Article>(`articles/${article.id}`).set(
      {
        ...article,
        id,
        createdAt: firestore.Timestamp.now(),
        thumbnailURL,
        logo,
        image1,
        image2,
      },
      { merge: true }
    );
  }
}
