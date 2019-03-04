//
//  Counter.swift
//  CounterApp
//
//  Created by Szalay Balázs on 2019. 03. 04..
//  Copyright © 2019. Facebook. All rights reserved.
//

//@objc(Counter)
//class Counter: RCTViewManager {
//  override func view() -> UIView! {
//    let label = UILabel()
//    label.text = "Swift Counter"
//    label.textAlignment = .center
//    return label
//  }
//  override static func requiresMainQueueSetup() -> Bool {
//    return true
//  }
//}


@objc(CounterViewManager)
class CounterViewManager: RCTViewManager {
//  override func view() -> UIView! {
//    let label = UILabel()
//    label.text = "Swift Counter"
//    label.textAlignment = .center
//    return label
//  }
  override func view() -> UIView! {
    return CounterView()
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc func updateFromManager(_ node: NSNumber, count: NSNumber) {
    
    DispatchQueue.main.async {                                // 2
      let component = self.bridge.uiManager.view(             // 3
        forReactTag: node                                     // 4
        ) as! CounterView                                       // 5
      component.update(value: count)                          // 6
    }
  }
}
