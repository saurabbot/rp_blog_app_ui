<template>
    <div class="popup-overlay">
      <div class="popup-content">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <style>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .popup-content {
    background-color: white;
    min-height: 50%;
    min-width: 50%;
    padding: 20px;
    border-radius: 4px;
  }
  </style>
  