//
//  CounterView.h
//  CounterApp
//
//  Created by Szalay Balázs on 2019. 03. 04..
//  Copyright © 2019. Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface CounterView : NSObject

@objc func updateFromManager(_ node: NSNumber, count: NSNumber) {
  
  DispatchQueue.main.async {
    let component = self.bridge.uiManager.view(
                                               forReactTag: node
                                               ) as! CounterView
    component.update(value: count)
  }
}

@end

NS_ASSUME_NONNULL_END
