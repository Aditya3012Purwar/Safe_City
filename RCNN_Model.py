import os
import cv2
import numpy as np
from keras.models import Sequential
from keras.layers.convolutional import Conv2D, MaxPooling2D
from keras.layers.core import Flatten, Dense, Dropout
from keras.layers import LSTM  
from keras.callbacks import EarlyStopping

data_dir = "/content/drive/MyDrive/Datas/SCVD/videos"
classes = ["Non-Violence Videos", "Weapon Violence", "violence video cleaned"]

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

model = Sequential()

model.add(Conv2D(32, (3, 3), padding="same", activation="relu", input_shape=(frames.shape[1], frames.shape[2], frames.shape[3])))
model.add(MaxPooling2D((2, 2), strides=(2, 2)))
model.add(Conv2D(64, (3, 3), padding="same", activation="relu"))
model.add(MaxPooling2D((2, 2), strides=(2, 2)))

model.add(Flatten())
model.add(LSTM(128))

model.add(Dense(len(classes), activation="softmax"))

model.compile(loss="categorical_crossentropy", optimizer="adam", metrics=["accuracy"])

early_stopping = EarlyStopping(monitor="val_loss", min_delta=0.0001, patience=10)
model.fit(frames, np.array([classes.index(class_name) for class_name in classes]), epochs=100, batch_size=32, callbacks=[early_stopping])

model.save("rcnn_safe_city_model.h5")

video = cv2.VideoCapture("video_file.mp4")
while True:
  ret, frame = video.read()
  if not ret:
    break
  frame = np.expand_dims(frame, axis=0)
  prediction = model.predict(frame)
  class_name = classes[np.argmax(prediction)]
  print(class_name)
