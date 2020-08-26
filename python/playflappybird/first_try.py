import sys
sys.path.append("game/")
import cv2
import wrapped_flappy_bird as game

import numpy as np
game_state = game.GameState()

# do = [0,1]
# image , reward , terminal = game_state.frame_step(do)

# print(image.shape,reward,terminal)

# image = cv2.cvtColor(image,cv2.COLOR_RGB2BGR)
# cv2.imshow('image',image)

# cv2.waitKey(0)

while True:
    do = np.random.choice( [True,False] , p = [0.4,0.6] )
    do = [0,1] if do else [1,0]
    image , reward , terminal = game_state.frame_step(do)


