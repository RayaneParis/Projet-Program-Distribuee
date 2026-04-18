package com.library.book_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.library.book_service.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}
