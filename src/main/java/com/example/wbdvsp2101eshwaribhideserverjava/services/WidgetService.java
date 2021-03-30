package com.example.wbdvsp2101eshwaribhideserverjava.services;

import com.example.wbdvsp2101eshwaribhideserverjava.models.Widget;
import com.example.wbdvsp2101eshwaribhideserverjava.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WidgetService {

    @Autowired
    WidgetRepository repository;

    // implement crud operations
    public Widget createWidgetForTopic(Widget widget) {
        return repository.save(widget);
    }
    public List<Widget> findAllWidgets() {
        return repository.findAllWidgets();
    }
    public List<Widget> findWidgetsForTopic(String topicId) {
        return repository.findWidgetsForTopic(topicId);
    }
    public Widget findWidgetById(Long id) {
        return repository.findWidgetById(id);
    }
    public Integer updateWidget(Long id, Widget newWidget) {
        Widget originalWidget = findWidgetById(id);

        originalWidget.setName(newWidget.getName());
        originalWidget.setTopicId(newWidget.getTopicId());
        originalWidget.setType(newWidget.getType());
        originalWidget.setWidgetOrder(newWidget.getWidgetOrder());
        originalWidget.setText(newWidget.getText());
        originalWidget.setUrl(newWidget.getUrl());
        originalWidget.setSize(newWidget.getSize());
        originalWidget.setWidth(newWidget.getWidth());
        originalWidget.setHeight(newWidget.getHeight());
        originalWidget.setCssClass(newWidget.getUrl());
        originalWidget.setStyle(newWidget.getStyle());
        originalWidget.setValue(newWidget.getValue());
        originalWidget.setOrdered(newWidget.getOrdered());

        repository.save(originalWidget);
        return 1;
    }
    public Integer deleteWidget(Long id) {

        repository.deleteById(id);
        return 1;
    }
}