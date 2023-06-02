import os
import cv2
import numpy as np
from keras.applications import VGG16
from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.callbacks import EarlyStopping

data_dir = "/content/drive/MyDrive/Datas/SCVD/videos"
classes = ["violence video cleaned", "Non-Violence Videos", "Weapon Violence"]

frames = []
for class_name in classes:
  for video_file in os.listdir(os.path.join(data_dir, class_name)):
    video = cv2.VideoCapture(os.path.join(data_dir, class_name, video_file))
    while True:
      ret, frame = video.read()
      if not ret:
        break
      frames.append(frame)
      
frames = np.array(frames)
frames = frames.astype("float32")
frames /= 255.0

vgg16 = VGG16(weights="imagenet", include_top=False)
model = Sequential()
model.add(vgg16)
model.add(Flatten())
model.add(Dense(128, activation="relu"))
model.add(Dropout(0.5))
model.add(Dense(len(classes), activation="softmax"))

model.compile(loss="categorical_crossentropy", optimizer="adam", metrics=["accuracy"])

early_stopping = EarlyStopping(monitor="val_loss", min_delta=0.0001, patience=10)
model.fit(frames, np.array([classes.index(class_name) for class_name in classes]), epochs=100, batch_size=32, callbacks=[early_stopping])

model.save("safe_city_model.h5")

video = cv2.VideoCapture("video_file.mp4")
while True:
  ret, frame = video.read()
  if not ret:
    break
  frame = np.expand_dims(frame, axis=0)
  prediction = model.predict(frame)
  class_name = classes[np.argmax(prediction)]
  print(class_name)
